/**
 * @jsx React.DOM
 */

var React = require('react') 

module.exports = Logo = React.createClass({
    render: function(){
        return (
            <h1>Sq!</h1>
        );
    }
})

// React.render(
//     <Logo/>,
//     document.querySelector('div.logo')
// );
