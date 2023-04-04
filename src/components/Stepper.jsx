import { withTranslation } from "next-i18next";
import { React, useState } from "react";

import Button from "./ui/Button";

function Stepper(props) {
    const { t, steps, currentStep } = props;
    const [current, setCurrent] = useState(
        currentStep >= 0 && currentStep < steps.length ? currentStep : 0
    );
    const nextStep = () => {
        if (current < steps.length - 1) {
            setCurrent(current + 1);
        }
    };

    const prevStep = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    return (
        <div className='bg-light-white px-2 rounded-md drop-shadow-lg w-full max-w-3xl'>
            {steps.map((step, index) => {
                return (
                    <div
                        key={index}
                        className={`${
                            current === index ? "block" : "hidden"
                        } w-full h-full p-4`}
                    >
                        <p className='text-3xl font-normal text-start'>
                            {step.title}
                        </p>
                        {step.content}
                    </div>
                );
            })}
            <div className='flex flex-row gap-4 mb-5 pl-[40px]'>
                {current > 0 && (
                    <Button
                        content={t("previous")}
                        onClick={prevStep}
                        textTransform='uppercase'
                        filled='true'
                        size='large'
                        fontSize='text-lg md:text-xl lg:text-2xl'
                        radius='md'
                    />
                )}
                {current < steps.length - 1 && (
                    <Button
                        content={t("next")}
                        onClick={nextStep}
                        textTransform='uppercase'
                        filled='true'
                        size='large'
                        fontSize='text-lg md:text-xl lg:text-2xl'
                        radius='md'
                    />
                )}
            </div>
        </div>
    );
}

export default withTranslation("appointment")(Stepper);
