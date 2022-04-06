import React, { Component } from 'react';
import { Table,  Button } from 'antd';

import Add from './add'

interface ISchema {
    id: number,
    title: string,
    type: number,
    type_text?: string,
    status: number,
    status_text?: string,
    graph_name: string,
}

/**
 * @abstract tableData: 表格数据
 * @abstract pageSize： 一页多少条数据
 * @abstract page：第几页
 * @abstract total： 表里总共多少条数据
 * @abstract laoding: 是否在请求数据, 请求时loading 请求完成修改位false
 */
 interface IState {
    tableData: ISchema[],
    pageSize: number,
    page: number,
    total: number,
    laoding: boolean,
    addVisible: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: ISchema;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {( children )}
        </td>
    );
};
export default class Schema extends Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            tableData: [
                {
                    id: 1,
                    title: '测试用例',
                    type: 1,
                    type_text: '测试',
                    status: 1,
                    status_text: '启用',
                    graph_name: '1111'
                }
            ],
            pageSize: 20,
            page: 1,
            total: 0,
            laoding: false,
            addVisible: false
        }
    }

    // 切换分页
    onChange = (pagination: any) => {
        console.log(pagination.current)
    }
    // 添加
    onClickAdd = () =>{
        this.setState({
            addVisible: true
        })
    }
    // 关闭添加
    cancelAdd = () =>{
        this.setState({
            addVisible: false
        })
    }

     //页面初始化时统一在这里请求数据
    componentDidMount = () =>{

    }
    render(): React.ReactNode {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '10%',
              },
            {
              title: '名称',
              dataIndex: 'title',
              width: '20%',
            },
            {
              title: '类型',
              dataIndex: 'type_text',
              width: '20%',
            },
            {
              title: '状态',
              dataIndex: 'status_text',
              width: '20%',
            },
            {
                title: '添加标题',
                dataIndex: 'address',
                width: '20%',
            },
            {
              title: '操作',
              dataIndex: 'operation',
              render: (_: any, record: ISchema) => {
                return (
                  <span>
                    <Button size='small' type='primary'>编辑</Button> 
                    <Button size='small' type='primary' danger>删除</Button> 
                  </span>
                );
              },
            },
        ];
        return (
            <div>
                <Button size='small' type='primary' onClick={ this.onClickAdd }>添加</Button>
                <Table
                    components={{
                        body: {
                        cell: EditableCell,
                        },
                    }}
                    bordered
                    size='small'
                    dataSource={this.state.tableData}
                    columns={columns}
                    rowKey={'id'}
                    
                    scroll={{
                        scrollToFirstRowOnChange: true,
                        x: 'max-content',
                        y: 'max-content'
                    }}
                    rowClassName="editable-row"
                    pagination={{
                        total: this.state.total,
                        pageSize: this.state.pageSize,
                        showSizeChanger: false
                    }}
                    onChange={ this.onChange }
                />
                <Add visible={this.state.addVisible} callback={ this.cancelAdd }/>
            </div>
           
        );
    }
}