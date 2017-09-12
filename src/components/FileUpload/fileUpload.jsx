import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './fileUpload.less'
import {getCookie} from  '../../util/cookie';
import { hashHistory } from 'react-router';
import { Form, Input, Tooltip, Upload,Button,Icon,Modal } from 'antd';
import {api} from '../../util/common';

const FormItem = Form.Item;
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

const username=getCookie('username');

class FileUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="fileUpload">
                <div className="fileUpload-title">发布模板文件</div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="上传文件"
                    >
                        {getFieldDecorator('upload1', {
                            valuePropName: 'fileList1',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name={username} action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getData.bind(this)}>
                                <Button>
                                    <Icon type="upload" />选择文件
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传文件"
                    >
                        {getFieldDecorator('upload2', {
                            valuePropName: 'fileList2',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name={username} action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getData.bind(this)}>
                                <Button>
                                    <Icon type="upload" />选择文件
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传文件"
                    >
                        {getFieldDecorator('upload3', {
                            valuePropName: 'fileList3',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name={username} action={api+"/dhy/background/fileOperate/upload"} listType="text" data={this.getData.bind(this)}>
                                <Button>
                                    <Icon type="upload" />选择文件
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交上传</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
    componentWillMount(){
        if(getCookie('accountType')!=1){
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
    getData(){
        return {
        }
    }
}
FileUpload = Form.create({})(FileUpload);
export default FileUpload;