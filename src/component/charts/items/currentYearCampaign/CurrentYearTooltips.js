export function CustomFlyoutY1(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[0] - moveXAmount;
    const newY = startLabelY - moveYAmount;

    return (
        <g>
            <rect  width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff" opacity={0.8} stroke="none" strokeWidth={2}/>
        </g>
    );

}

export function CustomFlyoutY2(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[1] - moveXAmount;
    const newY = startLabelY - moveYAmount;
    
    return (
        <g>
            <rect  width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[1]} strokeWidth={2}/>
        </g>
    );
    
}

export function CustomFlyoutY3(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[2] - moveXAmount - tooltipIntervalXSet[0];
    const newY = startLabelY - moveYAmount;
    
    return (
        <g>
            <rect  width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[2]} strokeWidth={2}/>
        </g>
    );
    
}

export function CustomFlyoutY4(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[3] - moveXAmount - tooltipIntervalXSet[1];
    const newY = startLabelY - moveYAmount;
    
    return (
        <g>
            <rect width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[3]} strokeWidth={2}/>
        </g>
    );
}

export function CustomFlyoutY5(flyoutComponentProps) {
    const { dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[4] - moveXAmount -tooltipIntervalXSet[2];
    const newY = startLabelY - moveYAmount;

    return (
        <g>
            <rect width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[4]} strokeWidth={2}/>
        </g>
    );
    
}

export function CustomFlyoutY6(flyoutComponentProps) {
    const {dataColorSet, startLabelY, labelLocationXSet, tooltipIntervalXSet, moveXAmount, moveYAmount, width, height } = flyoutComponentProps;
    const newX = labelLocationXSet[5] - moveXAmount - tooltipIntervalXSet[3];
    const newY = startLabelY - moveYAmount;

    return (
        <g>
            <rect width={width/10} height={height/20} x={newX} y={newY} rx={5} fill="#ffffff"  opacity={0.8} stroke={dataColorSet[5]} strokeWidth={2}/>
        </g>
    );
    
}