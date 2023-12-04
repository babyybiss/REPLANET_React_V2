export function CustomFlyoutY1(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y - 105;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[0]} strokeWidth={3}/>
        </g>
    );

}

export function CustomFlyoutY2(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y - (labelInterval*2);
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[1]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY3(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y - labelInterval;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[2]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY4(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y - (labelInterval-labelInterval);
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[3]} strokeWidth={3}/>
        </g>
    );
}

export function CustomFlyoutY5(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y + labelInterval;
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[4]} strokeWidth={3}/>
        </g>
    );
    
}

export function CustomFlyoutY6(flyoutComponentProps) {
    const { x, y, dataColorSet, labelInterval } = flyoutComponentProps;

    const newX = x - 75;
    const newY = y + (labelInterval*2);
    

    return (
        <g>
            <rect width="150" height="34" x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[5]} strokeWidth={3}/>
        </g>
    );
    
}