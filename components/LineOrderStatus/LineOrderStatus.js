import Rect, {useEffect, useState} from "react";
import StepIndicator from 'react-native-step-indicator';
import {Text, View} from "native-base";
import {statusCode, valStatusCode} from "~/utils/utils";

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#00B93F',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#00B93F',
    stepStrokeUnFinishedColor: "#868686",
    separatorFinishedColor: '#00B93F',
    separatorUnFinishedColor: '#868686',
    stepIndicatorFinishedColor: '#00B93F',
    stepIndicatorUnFinishedColor: '#868686',
    stepIndicatorCurrentColor: '#868686',
    stepIndicatorLabelFontSize: 11,
    currentStepIndicatorLabelFontSize: 11,
    stepIndicatorLabelCurrentColor: '#868686',
    stepIndicatorLabelFinishedColor: '#00B93F',
    stepIndicatorLabelUnFinishedColor: '#868686',
    labelColor: '#868686',
    labelSize: 11,
    currentStepLabelColor: '#00B93F'
}

const LineOrderStatus = ({labels = ["Created", "In process", "Completed", "Finished"], status = 0}) => {
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
        <>
            {
                status ===0 || status===5 || status ===6 || status ===7  ?
                    <Text style={{textAlign:'center'}}>{valStatusCode(status).name}</Text>
                    :
                    <View>{
                        labels_ && labels_.length > 0 &&
                        <StepIndicator
                            stepCount={4}
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                            labels={labels_}
                        />
                    }
                    </View>
            }

        </>


    )
}
export default LineOrderStatus;