import React from 'react'
// Components / Containers
import { Table, Button } from 'reactstrap';
// Props:
/*
    list: array with objects to be displayed
    headers: array of strings to be displayed as headers
    shownEl: array of keys to be displayed
    hasEditBtn: defines if Edit buttons appear in first column
*/

class List extends React.Component {

    render() {
        const { list, headers, shownEl, toggle } = this.props;

        return (
        <Table hover>
            <thead>
                <tr>
                    {toggle ? <th></th> : null}
                    {headers ? headers.map(header => 
                        <th key={header}>{header}</th>
                    ) : null}
                </tr>
            </thead>
            <tbody>
                {list ? list.map(rowItem => {
                    let rowIdKey = rowItem.id ? rowItem.id : rowItem.toString();
                    return <Row rowItem={rowItem} shownEl={shownEl} toggle={toggle} key={rowIdKey}/>
                }) : null}
            </tbody>
        </Table>
        );
    }
}

// Row
let Row = (props) => {
    const { rowItem, shownEl, toggle } = props;

    return <tr>
        {toggle ? <td><Button color="primary" onClick={(e) => toggle(e, 'true', rowItem)}>Edit</Button></td> : null}
        {Object.keys(rowItem)
            .filter( itemKey => shownEl.find( el => el === itemKey) )
            .map( itemKey => {
                let displayItem = rowItem[itemKey] instanceof Date ? rowItem[itemKey].toDateString() : rowItem[itemKey];
                return <td key={itemKey.toString()}>{displayItem}</td>;
            } )}
    </tr>;
}

export default List;