import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount = async () => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWY3YTRjNTllYzAwMTk5MGQ3MDUiLCJpYXQiOjE3MTA3Njg4NTYsImV4cCI6MTcxMTk3ODQ1Nn0.I3OzG9I3dPVtg1ZilwnCT_cF2emFXE3QdKzoyDsdD8E",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
