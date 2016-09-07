/**
 * Created by congcong on 16/8/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';

// Table data as a list of array.
const rows = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    // .... and more
];

var UsersTable = React.createClass({
    render: function () {
        return (
            <div className="users-table">
                <Table
                    rowHeight={50}
                    rowsCount={rows.length}
                    width={500}
                    height={500}
                    headerHeight={50}>
                    <Column
                        header={<Cell>Col 1</Cell>}
                        cell={<Cell>Column 1 static content</Cell>}
                        width={2000}
                    />
                    <Column
                        header={<Cell>Col 2</Cell>}
                        cell={<Cell>Column 2 static content</Cell>}
                        width={2000}
                    />
                    <Column
                        header={<Cell>Col 3</Cell>}
                        cell={<Cell>Column 3 static content</Cell>}
                        width={2000}
                    />
                </Table>
            </div>
        );
    }
});

ReactDOM.render(
    <UsersTable />,
    document.getElementById('users-table')
);