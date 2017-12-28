import React, {Component} from 'react';
import { connect } from 'react-redux';

export class GenericResponse extends Component {
    saveToLibrary(item) {
        this.props.saveToDatabase(this.props.type, item);
    }
    render() {
        if (this.props.type === 'track') {
            return this.props.response.tracks.items.map(item => {
                return (
                    <div className="bottom-border"
                        key={item.href}
                    >
                        <p>{item.name}</p>
                        <p> by {item.artists[0].name}</p>
                        <img 
                            height={item.album.images[2].height}
                            width={item.album.images[2].width}
                            src={item.album.images[0].url} />
                        <button
                            onClick={() => this.saveToLibrary(item)}
                        >Save to Library</button>
                    </div>
                )
            })
        } else if (this.props.type === 'album') {
            return this.props.response.albums.items.map(item => {
                return (
                <div className="bottom-border"
                    key={item.href}
                >
                    <p>{item.name}</p>
                    <p> by {item.artists[0].name}</p>
                    <img
                        height={item.images[2].height}
                        width={item.images[2].width}
                        src={item.images[0].url} />
                    <button
                        onClick={() => this.saveToLibrary(item)}
                    >Save to Library</button>
                </div>
            )})
        } else if (this.props.type === 'artist') {
            return this.props.response.artists.items.map(item => {
                return (
                    <div className="bottom-border"
                        key={item.href}
                    >
                        <a href={item.external_urls.spotify}
                            target="_blank">
                            <p>{item.name}</p>
                        </a>
                        <button
                            onClick={() => this.saveToLibrary(item)}
                        >Save to Library</button>
                    </div>
                )
            })
        } else {
            return (
                <div>An Error Occurred</div>
            )
        }
    }
}

export default connect(
    (state) => (state)
)(GenericResponse);