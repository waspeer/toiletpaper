declare module 'react-animated-text' {
  interface RandomProps {
    text: string;
    iterations?: number | 'infinite';
    effect?: string;
    effectDuration?: number;
    effectDelay?: number;
    effectChange?: number | string;
    effectDirection?: string;
    paused?: boolean;
    initialStyle?: React.CSSProperties;
  }

  export const Random = (props: RandomProps) => JSX.Element;
}
