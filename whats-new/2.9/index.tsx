class GenericComponent<P> extends React.Component<P>{
    inetrnalProp: P;
}

type Props = {
    a: number;
    b: string;
};

// 确实很好用
const x = <GenericComponent<Props> a={10} b="hi"/>;