declare module 'react-lazy-load-image-component' {
    import { ComponentType, ImgHTMLAttributes, ReactNode } from "react";

    export interface LazyLoadImagesProps extends ImgHTMLAttributes<HTMLImageElement> {
        afterLoad?: () => void;
        beforeLoad?: () => void;
        delayMethod?: 'debounce' | 'throttle';
        delayTime?: number;
        effect?: string;
        placeholderSrc?: string;
        threshold?: number;
        userIntersectionObserver?: boolean;
        visibleByDefault?: boolean;
        wrapperClassName?: string;
        wrapperProps?: Record<string, any>;
    }

    export const LazyLoadImage: ComponentType<LazyLoadImagesProps>;

    export interface TrackWindowScrollProps {
        children: ReactNode;
        delayMethod?: 'debounce' | 'throttle';
        delayTime?: number;
        useIntersectionObserver?: boolean;
    }

    export function TrackWindowScrollProps<P extends TrackWindowScrollProps>(
        Component: ComponentType<P>
    ): ComponentType<P>;
}