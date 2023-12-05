export function CustomFlyoutY1(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[0]-75;
    const newY = startLabelY - 18;

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[0]} strokeWidth={3}/>
        </g>
    );

}

export function CustomFlyoutY2(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[1]-75;
    const newY = startLabelY - 18;
    
    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[1]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY3(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[2]-75;
    const newY = startLabelY - 18;
    
    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[2]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY4(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[3]-75;
    const newY = startLabelY - 18;
    
    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[3]} strokeWidth={3}/>
        </g>
    );
}

export function CustomFlyoutY5(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[4]-75;
    const newY = startLabelY - 18;

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[4]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY6(flyoutComponentProps) {
    const {dataColorSet, startLabelY, labetLocationXSet } = flyoutComponentProps;
    const newX = labetLocationXSet[5]-75;
    const newY = startLabelY - 18;

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[5]} strokeWidth={3}/>
        </g>
    );
    
}