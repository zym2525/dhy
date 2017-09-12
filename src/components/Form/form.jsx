import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import { Form, Input, Tooltip, Upload,Button,Icon,Radio ,DatePicker,Col } from 'antd';
import './form.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};



class UseForm extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form">
                <div className="common-title">title</div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              培训项目名称
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('pname', {
                            rules: [{ required: true, message: '请输入培训项目名称!', whitespace: true }]
                        })(
                            <Input placeholder="必填*" name="pname"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              办班单位
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('office', {
                            rules: [{ required: true, message: '请输入办班单位!', whitespace: true }]
                        })(
                            <Input placeholder="必填*" name="office"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              联系人
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('linkman', {
                            rules: [{ required: true, message: '请输入联系人!', whitespace: true }]
                        })(
                            <Input placeholder="必填*" name="linkman"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              联系人电话
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('linknum', {
                            rules: [{ required: true, message: '请输入联系人电话!', whitespace: true,pattern:/\d+/ }]
                        })(
                            <Input placeholder="必填*" name="linknum"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="政府委托项目"
                    >
                        {getFieldDecorator('isGovernmentcommissionedprojects',{
                            initialValue:'1'
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="isGovernmentcommissionedprojects">
                                <Radio value='1'>是</Radio>
                                <Radio value='0'>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="培训对象"
                    >
                        {getFieldDecorator('trainees',{
                            initialValue:'0'
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="trainees">
                                <Radio value='0'>社会人员</Radio>
                                <Radio value='1'>本校在校生</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="校外人员要进入校园"
                    >
                        {getFieldDecorator('isOutofschoolpersonnelneedtoenterthecampus',{
                            initialValue:'1'
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="isOutofschoolpersonnelneedtoenterthecampus">
                                <Radio value='1'>是</Radio>
                                <Radio value='0'>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              合作单位
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('partner', {
                            rules: [{ required: true, message: '请输入合作单位!', whitespace: true }]
                        })(
                            <Input placeholder="必填*" name="partner"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              培训内容
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('content',{})(
                            <TextArea name="content"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="计划开始时间"
                    >
                        {getFieldDecorator('starttime', {
                            rules: [{ type: 'object', required: true, message: '请选择时间！' }],
                        })(
                            <DatePicker name="starttime"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="计划结束时间"
                    >
                        {getFieldDecorator('endtime', {
                            rules: [{ type: 'object', required: true, message: '请选择时间！' }],
                        })(
                            <DatePicker name="endtime"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              计划招生人数
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('enrollment', {
                            rules: [{ required: true, message: '请填写人数!', whitespace: true }]
                        })(
                            <Input placeholder="必填*" name="enrollment" type="number"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              培训费
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('trainingexpense')(
                            <Input placeholder="收费标准（元/人）" name="trainingexpense" type="number"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              代管费
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('escrowfee')(
                            <Input placeholder="收费标准（元/人）" name="escrowfee" type="number"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              办班单位
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('unit')(
                            <div>
                                <Input placeholder="培训费比例" name="classunitPercentage" type="number" style={{width:'40%',display:'inline-block'}}/>%,计
                                <Input placeholder="培训费分配" name="classunitmoney" type="number" style={{width:'40%',display:'inline-block'}}/>人
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                              合作单位
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('partnerBox')(
                            <div>
                                <Input placeholder="培训费比例" name="partnerPercentage" type="number" style={{width:'40%',display:'inline-block'}}/>%,计
                                <Input placeholder="培训费分配" name="partnermoney" type="number" style={{width:'40%',display:'inline-block'}}/>人
                            </div>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
    componentWillMount(){
        if(getCookie('accountType')!=0){
            hashHistory.push('/');
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    handleRadioChange({target}){
        if(target.name=='isGovernmentcommissionedprojects'){
            this.props.form.setFieldsValue({
                isGovernmentcommissionedprojects:target.value
            });
        }else if(target.name=='trainees'){
            this.props.form.setFieldsValue({
                trainees:target.value
            });
        }else if(target.name=='isOutofschoolpersonnelneedtoenterthecampus'){
            this.props.form.setFieldsValue({
                isOutofschoolpersonnelneedtoenterthecampus:target.value
            });
        }

    }
}
UseForm = Form.create({})(UseForm);
export default UseForm;
