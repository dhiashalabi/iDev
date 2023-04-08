import { withTranslation } from "next-i18next";

import RadioGroup from "../ui/radiogroup/RadioGroup";
import RadioInputItem from "../ui/radiogroup/RadioInputItem";

const CounselingType = ({ t, name, counselingType, onChange }) => {
    return (
        <>
            <RadioGroup title={t("counselingTypeTitle")} asButton={true}>
                <RadioInputItem
                    id='individual'
                    name={name}
                    value='individual'
                    title={t("individualCounseling")}
                    checked={counselingType === "individual"}
                    onChange={(e) => onChange(e)}
                />
                <RadioInputItem
                    id='teen'
                    name={name}
                    value='teen'
                    title={t("teenCounseling")}
                    checked={counselingType === "teen"}
                    onChange={(e) => onChange(e)}
                />
            </RadioGroup>
        </>
    );
};

export default withTranslation("appointment")(CounselingType);
