import React from 'react';
import './ModalWindow.css';
export class ModalButton extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isModalOpen: false }
      this.state.GeoJSON = this.props.GeoJSON;
      this.state.access = "public";
      this.state.owner = "admin";
      this.handleClick = this.handleClick.bind(this);
    };
    handleClick(e)
    {
      var JSONtoBack = {
        owner: this.state.owner,
        access: this.state.access,
        GeoJSON:this.state.GeoJSON,
      }
      fetch('/MakeLayer.php',{
        method: 'POST',
        body:JSON.stringify(JSONtoBack),
        headers: {
        'Content-Type': 'application/json'
          }
        }).then(response => response.json());
      e.preventDefault();
    }
    componentDidUpdate()
    {
      if (this.state.GeoJSON != this.props.GeoJSON)
      {
        this.setState({GeoJSON:this.props.GeoJSON})
      }
    }
    render() {
      return (
        <div>
          <button onClick={() => this.openModal()}>Open modal</button>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <form onSubmit={this.handleClick}>
            <label>
              Layer`s name:
              <input type="text"/>  
            </label>
            <label>
              ac:
              <input type="text"/>  
            </label>
            <input type="submit" value="Сохранить" onClick=""/>
           </form>
          </Modal>
        </div>
      )
    }

    openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }
  }

export class Modal extends React.Component {
    render() {
      if (this.props.isOpen === false)
        return null

      return (
        <div>
          <div className="modal">
            {this.props.children}
          </div>
          <div className="bg" onClick={e => this.close(e)}/>
        </div>
      )
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }