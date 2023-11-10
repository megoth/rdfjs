import Columns from "../../columns";
import BusinessGuideUseCase from "../use-case";
import {USE_CASES} from "../../../constants.tsx";

export default function BusinessGuideUseCases() {
    return <Columns>
        {USE_CASES.map((useCase) => (
            <BusinessGuideUseCase key={useCase.title} useCase={useCase} />
        ))}
    </Columns>
}