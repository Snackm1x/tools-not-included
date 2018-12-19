import * as React from "react";
import { Alert, Button, Col, Form, Row, Icon } from "antd";
import { Formik, FormikErrors, FieldArray } from "formik";

import TextInput from "../../../../components/forms/TextInput";
import FormItem from "antd/lib/form/FormItem";
import CompositeRow from "./CompositeRow";

interface FormValues {
    seedNumber?: number,
    rules: RuleValues[]
}

export interface RuleValues {
    conditionType: string,
    conditionObject: string,
    conditionValue: number,
    conditionComparator: string
}


const TestFormikAntd = () => {

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };

    return (
        <Formik
           initialValues = {{seedNumber: undefined, rules: [
               {conditionValue: 0, conditionComparator: 'at_least', conditionObject:'abc', conditionType: "abc" }, 
               {conditionValue: 0, conditionComparator: 'at_least', conditionObject:'abc', conditionType: "abc" }, 
               {conditionValue: 0, conditionComparator: 'at_most', conditionObject:'abc', conditionType: "abc" }]}}
            onSubmit={(values: FormValues) => alert(JSON.stringify(values))}
            validate={(values: FormValues) => {
                let errors: FormikErrors<FormValues> = {};
                if (!values.seedNumber) { errors.seedNumber = 'Required' };
                return errors;//tood async?
            }}
            render={form => (
                <Form
                    layout="vertical"
                    onSubmit={form.handleSubmit}
                    style={{ margin: 20 }}>

                    <TextInput {...form} name="seedNumber" label="Search for a specific seed" formItemProps={formItemLayoutWithOutLabel} />

                    <p>Or make your own rules:</p>

                <FieldArray name="rules"
                render={arrayHelpers => (
                    <div>
                    <CompositeRow {...form} name="rules" idx={0}/>
                    <CompositeRow {...form} name="rules" idx={1}/>
                    <CompositeRow {...form} name="rules" idx={2}/>
                    </div>
                    )}/>

                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" style={{ width: '60%' }} className="transparent-background-color"> {/*onClick={this.add} */}
                            <Icon type="plus" /> Add rule
                        </Button>
                    </FormItem>



                    <Button type="primary" htmlType="submit" disabled={form.isSubmitting} >Search</Button>

                    <pre>
                        {JSON.stringify(form.values, null, 2)}
                    </pre>
                </Form>
            )}
        />
    );
};

export default TestFormikAntd;
