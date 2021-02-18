import React, { Component } from 'react'
import './App.css'
import Nav from './Nav'
import Footer from './Footer'
import BlogForm from './BlogForm'
import Post from './Post'

class App extends Component {
	//this is our state object
	state = {
		isShowing: true,
		posts: []
	}

	componentDidMount = () =>{
		getAll().then(results =>{
			console.log('partying on line 17:::', results) // this comes back as an arry of objects 
			this.setState({
				posts: results // we do not need to spread it becuase we are just updating the posts to hold the arry of obj
			})
		})
	}


	// we will define all event logic here
	handleShowForm = event => {
		this.setState({
			isShowing: !this.state.isShowing
		})
	}

	//update state here and pass this method down to another component
	handleAddPost = ({ title, author, post }) => {
		const url = 'http://localhost:8000/api/post'
		const options = {
			method: 'POST',
			headers: {
				"content-type" : "application/json"
			},
			body: JSON.stringify({title, author, post})
		}

		handleVerbs(url, options).then(results=>{
			console.log(results) // this returns a single object
			this.setState({
				posts: [...this.state.posts, results] // we do not need to spread it because we are just adding the single object to the end of the array. We have to spread out the state.posts is because its in an arry and we have to extract each obj out of it
			})
		})
	}

	handleDelete = id => {
		// first we copy the state and modify it
		let newState = this.state.posts.filter(
			item => this.state.posts[id] !== item
		)
		// set the state
		this.setState({
			posts: newState
		})
	}

	// this is our render which handles our view
	render() {
		// compose components down here and later
		// TODO : extract these to seperate components
		const title = <h1>Confetti Blog</h1>
		const composedPosts = this.state.posts.map((item, index) => {
			return (
				<Post
					key={index}
					title={item.title}
					user={item.author}
					content={item.post}
					handleDelete={this.handleDelete}
					id={index}
				/>
			)
		})
		return (
			<div className="App container">
				<Nav content={title} />
				{!this.state.isShowing ? (
					<BlogForm
						handleAddPost={this.handleAddPost}
						handleToggle={this.handleShowForm}
					/>
				) : (
					<button onClick={this.handleShowForm}>Add Post</button>
				)}
				<ul>{composedPosts}</ul>
				<Footer />
			</div>
		)
	}
}

export default App


async function getAll(){
	const url = 'http://localhost:8000/api/posts'
	const initalFetch = await fetch(url)
	const fetchJSON = await initalFetch.json()
	return await fetchJSON
}

async function handleVerbs(url, options){
	const initalFetch = await fetch(url, options)
	const fetchJSON = await initalFetch.json()
	return await fetchJSON
}
