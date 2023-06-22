import React from "react";

export default class Listado extends React.Component {

    render() {
        return (
            <ol>
                {this.props.children}
            </ol>
        )
    }
}