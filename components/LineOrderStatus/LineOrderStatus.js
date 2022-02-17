import Rect, {useEffect, useState} from "react";
import StepIndicator from 'react-native-step-indicator';
import {View} from "native-base";

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:40,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: 'black',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'black',
    stepStrokeUnFinishedColor: "#868686",
    separatorFinishedColor: 'black',
    separatorUnFinishedColor: '#868686',
    stepIndicatorFinishedColor: 'black',
    stepIndicatorUnFinishedColor: '#868686',
    stepIndicatorCurrentColor: '#868686',
    stepIndicatorLabelFontSize: 11,
    currentStepIndicatorLabelFontSize: 11,
    stepIndicatorLabelCurrentColor: '#868686',
    stepIndicatorLabelFinishedColor: 'black',
    stepIndicatorLabelUnFinishedColor: '#868686',
    labelColor: '#868686',
    labelSize: 11,
    currentStepLabelColor: 'black'
}

const LineOrderStatus = ({labels = ["Order Shipped", "Order Delivery", "In process", "Delivered"], status = 0}) => {
    const [labels_, setLabel] = useState([])
    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        if (labels && labels.length > 0) {
            setLabel(labels)
        }
    }, []);

    useEffect(() => {
        setCurrentPosition(status)
    }, [status]);

    return (
        <View>{
            labels_ && labels_.length > 0 &&
            <StepIndicator
                stepCount={labels_.length}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels_}
            />
        }
        </View>

    )
}
export default LineOrderStatus;