import React, { Component } from 'react'
import './BlogForm.css'
import PropTypes from 'prop-types'

class BlogForm extends Component {
	state = {
		title: '',
		author: '',
		post: ''
	}

	handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.handleAddPost({...this.state}) // this is what actually set the state
	}

	render() {
		return (
			<form className="blog-form" onSubmit={this.handleSubmit}>
				<h1>{this.state.title}</h1>
				<div className="post-title-author">
					<div>
						{' '}
						<label>Title</label>
						<input
							type="text"
							name="title"
							onChange={this.handleOnChange}
							value={this.state.title}
						/>
					</div>
					<div>
						<label>Author</label>
						<input
							type="text"
							name="author"
							onChange={this.handleOnChange}
							value={this.state.author}
						/>
					</div>
				</div>
				<label>New Post</label>
				<textarea
					type="text"
					name="post"
					onChange={this.handleOnChange}
					value={this.state.post}
				/>
				<button className='button-primary' onClick={this.props.handleToggle}>close</button>
				<input type="submit"/>
			</form>
		)
	}
}

export default BlogForm

BlogForm.propTypes = {
	handleToggle: PropTypes.func,
	handleAddPost: PropTypes.func
}
