import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import News from '../../containers/News'
import { Form, Input, Tooltip, Upload,Button,Icon,Select } from 'antd';
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import {api,showSuccess} from '../../util/common';
import { postData } from '../../fetch/postData';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
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
const username=getCookie('loginName');


import './announce.less'
class Announce extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            themeCode:''
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
           <div className="announce">
               <div className="announce-title">发布公告</div>
               <Form onSubmit={this.handleSubmit.bind(this)}>
                   <FormItem
                       {...formItemLayout}
                       label={(
                            <span>
                              公告标题
                            </span>
                        )}
                       hasFeedback
                   >
                       {getFieldDecorator('annonceTitle', {
                           rules: [{ required: true, message: '请输入公告标题!', whitespace: true }]
                       })(
                           <Input placeholder="必填*" name="title"/>
                       )}
                   </FormItem>
                   <FormItem
                       {...formItemLayout}
                       label={(
                            <span>
                              公告内容
                            </span>
                        )}
                       hasFeedback
                   >
                       {getFieldDecorator('annonceContent',{})(
                           <TextArea autosize={{ minRows: 6 }} name="content"/>
                       )}
                   </FormItem>
                   <FormItem
                     {...formItemLayout}
                     label="类型"
                     hasFeedback
                   >
                     {getFieldDecorator('type', {
                       rules: [{ required: true, message: '请选择类型!', whitespace: true }]
                     })(
                       <Select
                       >
                         <Option value='0'>通知公告</Option>
                         <Option value='1'>管理制度</Option>
                       </Select>
                     )}
                   </FormItem>
                   {
                       this.state.themeCode=='create'&&<FormItem
                           {...formItemLayout}
                           label="上传文件"
                       >
                           {getFieldDecorator('upload', {
                               valuePropName: 'fileList',
                               getValueFromEvent: this.normFile,
                           })(
                               <Upload name='file' action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getData.bind(this)}>
                                   <Button>
                                       <Icon type="upload" />选择文件
                                   </Button>
                               </Upload>
                           )}
                       </FormItem>
                   }
                   <FormItem {...tailFormItemLayout}>
                       <Button type="primary" htmlType="submit">发布</Button>
                   </FormItem>
               </Form>
           </div>
        )
    }
    componentWillMount(){
        if(getCookie('accountType')!=1){
            hashHistory.push('/');
            return;
        }
        const themeCode=this.props.params.id;
        if(themeCode){
            this.setState({
                themeCode:themeCode
            });
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(this.state.themeCode=='create'){
                    this.saveTheme(values);
                }else{
                    this.updateTheme(values);
                }
            }
        });
    }
    saveTheme(values){
        let data={
            title:values.annonceTitle,
            content:values.annonceContent||'',
            fileName:values['upload'][0]['name'],
            type:values.type,
            isTop:1,
            loginName:username
        };
        data['fileId']=values['upload'][0]['response']['data']['id'];
        postData(api+'/dhy/theme/saveTheme',data,(result)=>{
            showSuccess('发布成功');
        });
    }
    updateTheme(values){
        let data={
            title:values.annonceTitle,
            content:values.annonceContent||'',
            themeCode:this.state.themeCode,
            loginName:username
        };
        postData(api+'/dhy/theme/updateTheme',data,(result)=>{
            showSuccess('修改成功');
        });
    }
    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    getData(){
        return {
            fileType:11,
            loginName:username
        }
    }
}
Announce = Form.create({})(Announce);
export default Announce;
