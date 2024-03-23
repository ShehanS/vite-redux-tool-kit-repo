// import React, { FC, ReactNode, useEffect, useRef, cloneElement } from 'react';
//
// type Props = {
//     children: ReactNode;
//     enable: boolean;
//     [key: string]: any;
// };
//
// const FeatureHandler: FC<Props> = ({ children, enable, ...rest }) => {
//     const elementRef = useRef<HTMLInputElement>(null);
//
//     useEffect(() => {
//         if (elementRef.current) {
//             elementRef.current.disabled = !enable;
//         }
//     }, [enable]);
//
//     const childrenWithRef = React.Children.map(children, (child: React.ReactNode) => {
//         if (React.isValidElement(child)) {
//             // Cast elementRef to any to avoid TypeScript error
//             return React.cloneElement(child, elementRef);
//         }
//         return child;
//     });
//
//     return <React.Fragment {...rest}>{childrenWithRef}</React.Fragment>;
// };
//
// export default FeatureHandler;
