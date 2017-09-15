import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import { Form, Input, Tooltip, Upload,Button,Icon,Radio ,DatePicker,Modal } from 'antd';
import {api} from '../../util/common';
import { postData } from '../../fetch/postData';
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
        this.state={
          isPreview:false,
          values:{}
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form">
                <div className="common-title">宁波大红鹰学院非学历教育培训申请表</div>
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
                            <Input placeholder="必填*" name="pname" disabled={this.state.isPreview}/>
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
                            <Input placeholder="必填*" name="office" disabled={this.state.isPreview}/>
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
                            <Input placeholder="必填*" name="linkman" disabled={this.state.isPreview}/>
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
                            <Input placeholder="必填*" name="linknum" disabled={this.state.isPreview}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="政府委托项目"
                    >
                        {getFieldDecorator('isGovernmentcommissionedprojects',{
                            initialValue:1
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="isGovernmentcommissionedprojects">
                                <Radio value={1} disabled={this.state.isPreview}>是</Radio>
                                <Radio value={0} disabled={this.state.isPreview}>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="与校外单位合作举办"
                    >
                      {getFieldDecorator('isPartnerOutschool',{
                        initialValue:1
                      })(
                        <RadioGroup onChange={this.handleRadioChange.bind(this)} name="isPartnerOutschool">
                          <Radio value={1} disabled={this.state.isPreview}>是</Radio>
                          <Radio value={0} disabled={this.state.isPreview}>否</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="培训对象"
                    >
                        {getFieldDecorator('trainees',{
                            initialValue:0
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="trainees">
                                <Radio value={0} disabled={this.state.isPreview}>社会人员</Radio>
                                <Radio value={1} disabled={this.state.isPreview}>本校在校生</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="校外人员要进入校园"
                    >
                        {getFieldDecorator('isOutofschoolpersonnelneedtoenterthecampus',{
                            initialValue:1
                        })(
                            <RadioGroup onChange={this.handleRadioChange.bind(this)} name="isOutofschoolpersonnelneedtoenterthecampus">
                                <Radio value={1} disabled={this.state.isPreview}>是</Radio>
                                <Radio value={0} disabled={this.state.isPreview}>否</Radio>
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
                            <Input placeholder="必填*" name="partner" disabled={this.state.isPreview}/>
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
                            <TextArea name="content" disabled={this.state.isPreview}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="计划开始时间"
                    >
                        {getFieldDecorator('starttime', {
                            rules: [{ type: 'object', required: true, message: '请选择时间！' }],
                        })(
                            <DatePicker name="starttime" disabled={this.state.isPreview}/>
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
                            <Input placeholder="必填*" name="enrollment" type="number" disabled={this.state.isPreview}/>
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
                            <Input placeholder="收费标准（元/人）" name="trainingexpense" type="number" disabled={this.state.isPreview}/>
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
                            <Input placeholder="收费标准（元/人）" name="escrowfee" type="number" disabled={this.state.isPreview}/>
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
                      <FormItem style={{width:'40%',display:'inline-block'}}>
                        {getFieldDecorator('classunitPercentage')(
                            <div>
                                <Input placeholder="培训费比例" value={this.state.values.trainingObjectParts} name="classunitPercentage" type="number" style={{width:'80%'}} disabled={this.state.isPreview}/>%,计
                            </div>
                        )}
                      </FormItem>
                      <FormItem style={{width:'40%',display:'inline-block'}}>
                        {getFieldDecorator('classunitmoney')(
                          <div>
                            <Input placeholder="培训费分配" name="classunitmoney" type="number" style={{width:'80%'}} disabled={this.state.isPreview}/>人
                          </div>
                        )}
                      </FormItem>
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
                      <FormItem style={{width:'40%',display:'inline-block'}}>
                        {getFieldDecorator('partnerPercentage')(
                              <div>
                                <Input placeholder="培训费比例" name="partnerPercentage" type="number" style={{width:'80%'}} disabled={this.state.isPreview}/>%,计
                            </div>
                        )}
                      </FormItem>
                      <FormItem style={{width:'40%',display:'inline-block'}}>
                        {getFieldDecorator('partnermoney')(
                          <div>
                            <Input placeholder="培训费分配" name="partnermoney" type="number" style={{width:'80%'}} disabled={this.state.isPreview}/>人
                          </div>
                        )}
                      </FormItem>
                    </FormItem>
                  {
                      !this.state.isPreview&&
                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                      </FormItem>
                  }
                </Form>
            </div>
        )
    }
    componentWillMount(){
        if(getCookie('accountType')!=0){
            hashHistory.push('/');
        }
    }
    componentWillReceiveProps(nextProps){
      //this.init(nextProps);
    }
    componentDidMount(){
        this.init(this.props);
    }
    init(props){
      let id=props.params.id;
      if(id!='create'){
        this.setState({
          isPreview:true
        });
        let data={
          applicationCode:id
        };
        postData(api+'/dhy/application/getApplicationInfo',data,(result)=>{
          let values=result.application;
          this.setState({
            values:values
          });
          props.form.setFieldsValue({
            pname:values.projectName,
            isGovernmentcommissionedprojects:values.isGoverEntrust,
            office:values.schoolUnit,
            linkman:values.contact,
            linknum:values.mobileNo,
            trainees:values.trainingObject,
            isOutofschoolpersonnelneedtoenterthecampus:values.isEnterSchool,
            isPartnerOutschool:values.isPartnerOutschool,
            partner:values.partnerUnit,
            content:values.trainingContent,
            enrollment:values.planSupplyNum,
            trainingexpense:values.trainingFee,
            escrowfee:values.heldFee,
            classunitPercentage:values.trainingObjectParts,
            classunitmoney:values.trainingObjectAvg,
            partnerPercentage:values.partnerUnitParts,
            partnermoney:values.partnerUnitAvg
          });
        });
      }else{
        this.setState({
          isPreview:false,
          values:[]
        });
      }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              let data={
                projectName:values.pname,
                isGoverEntrust:values.isGovernmentcommissionedprojects,
                schoolUnit:values.office,
                contact:values.linkman,
                mobileNo:values.linknum,
                trainingObject:values.trainees,
                isEnterSchool:values.isOutofschoolpersonnelneedtoenterthecampus,
                isPartnerOutschool:values.isPartnerOutschool,
                partnerUnit:values.partner,
                trainingContent:values.content,
                planStartTime:values.starttime.format('YYYY-MM-DD HH:mm:ss'),
                planSupplyNum:values.enrollment,
                trainingFee:values.trainingexpense,
                heldFee:values.escrowfee,
                trainingObjectParts:values.classunitPercentage,
                trainingObjectAvg:values.classunitmoney,
                partnerUnitParts:values.partnerPercentage,
                partnerUnitAvg:values.partnermoney,
                supplyName:getCookie('loginName')
              };
              postData(api+'/dhy/application/saveApplication',data,()=>{
                let modal = Modal.success({
                  title: '提示',
                  content: '提交成功'
                });
                setTimeout(() => modal.destroy(), 800);
              });
            }
        });
    }
    normFile(e) {
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
