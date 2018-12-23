import * as Yup from 'yup';

export const maxRules = 30;

export default Yup.object().shape({
    seedNumber: Yup.number()
        .moreThan(-1, "Seed numbers start at 0")
        .lessThan(2147483648, "The seed number can be at most 2147483647")
        .notRequired()
        .integer(),
    rules: Yup.array()
        .of(
            Yup.object().shape({
                conditionObjectType: Yup.string(),
                conditionObject: Yup.string()
                    .required("Please select an object or remove the incomplete rule"),
                conditionValue: Yup.number()
                    .min(0, "Please provide a non-negative value"),
                conditionComparator: Yup.string()
                    .required(),
                ruleGroupId: Yup.number()
                    .required(),
                ruleId: Yup.number()
                    .required()
            })
        )
        .max(maxRules, `You picky bastard, you. Maximum of ${maxRules} rules allowed.`)
        .notRequired()
})