import { ReactNode } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';

export const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

function directionOffset(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: -distance };
    case 'right':
      return { x: distance };
    default:
      return {};
  }
}

interface RevealProps extends Omit<MotionProps, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  margin?: string;
  className?: string;
}

/** Fade + directional slide, triggered once the element enters the viewport. */
export function FadeUp({
  children,
  direction = 'up',
  distance = 24,
  duration = 0.7,
  delay = 0,
  once = true,
  margin = '-60px',
  className,
  ...rest
}: RevealProps) {
  const { allowRichMotion } = useMotionPrefs();
  const offset = allowRichMotion ? directionOffset(direction, distance) : {};
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Larger, more deliberate directional slide — for content that should read as
 *  entering from a specific side (left column from left, right column from right). */
export function SlideIn(props: RevealProps) {
  return <FadeUp distance={40} duration={0.8} {...props} />;
}

/** Scale + fade "pop" — for buttons, badges, pills, CTAs. */
export function ScaleReveal({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = '-40px',
  className,
  ...rest
}: RevealProps) {
  const { allowRichMotion } = useMotionPrefs();
  return (
    <motion.div
      initial={{ opacity: 0, scale: allowRichMotion ? 0.95 : 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Clip-path mask reveal — for images and large visual blocks. */
export function ImageReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  margin = '-60px',
  className,
  ...rest
}: RevealProps) {
  const { allowRichMotion } = useMotionPrefs();
  const clips: Record<Direction, [string, string]> = {
    up: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
    down: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
    left: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    right: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
    none: ['inset(0 0 0 0)', 'inset(0 0 0 0)'],
  };
  const [from, to] = clips[direction];
  return (
    <motion.div
      initial={allowRichMotion ? { clipPath: from, opacity: 0.001 } : { opacity: 0 }}
      whileInView={allowRichMotion ? { clipPath: to, opacity: 1 } : { opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent for staggered children — pair with StaggerItem. */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  margin = '-60px',
  className,
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: string;
  className?: string;
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Child of StaggerContainer — inherits timing from the parent's stagger. */
export function StaggerItem({
  children,
  direction = 'up',
  distance = 22,
  scale = false,
  className,
  ...rest
}: RevealProps & { scale?: boolean }) {
  const { allowRichMotion } = useMotionPrefs();
  const offset = allowRichMotion ? directionOffset(direction, distance) : {};
  const variants: Variants = {
    hidden: { opacity: 0, scale: scale && allowRichMotion ? 0.94 : 1, ...offset },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };
  return (
    <motion.div variants={variants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/** Line-by-line heading reveal: each line masks in from below with a slight blur-out. */
export function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
  once = true,
  margin = '-80px',
}: {
  lines: string[];
  className?: string;
  lineClassName?: (index: number) => string;
  delay?: number;
  once?: boolean;
  margin?: string;
}) {
  const { allowRichMotion } = useMotionPrefs();
  const lineVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  };
  const inner: Variants = {
    hidden: { opacity: 0, y: '100%', filter: allowRichMotion ? 'blur(6px)' : 'blur(0px)' },
    visible: {
      opacity: 1,
      y: '0%',
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: EASE },
    },
  };
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin }}
          variants={lineVariants}
          className="block overflow-hidden"
        >
          <motion.span variants={inner} className={`inline-block ${lineClassName ? lineClassName(i) : ''}`}>
            {line}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}
