/**
 * @jsx React.DOM
 */
 
var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Sq!</h1>
        );
    }
})

React.renderComponent(
    <MyComponent/>,
    document.querySelector('div.logo')
);
