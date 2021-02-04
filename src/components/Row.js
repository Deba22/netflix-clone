import React, { useEffect, useState } from 'react';
import './Row.css'
import axios from '../axios'
import playIcon from '../icons/play-button.svg';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import requests from '../Requests'
import YouTube from 'react-youtube';

// const useStyles = makeStyles({
//     dialog: {
//         height: 400,
//         width: 1000
//     }
// });

function SimpleMemberDialog(props) {
    //const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const [video, setVideo] = useState([]);
    const opts = {
        height: '540',
        width: '1000',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClose = () => {
        onClose(selectedValue);
    };
    useEffect(() => {
        async function fetchVideo() {
            const request = await axios.get(`movie/${selectedValue}/videos?api_key=${requests.API_KEY}&language=en-US`);
            var videos=request.data.results;
            setVideo(videos[0])
            return request;
        }
        if(selectedValue){
            fetchVideo();
        }
      
    }, [])
    //console.log(selectedValue);
    //console.log(video.key);
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
                {/* <DialogTitle id="simple-dialog-title">Movie Trailer</DialogTitle> */}
                {/* <h2>{selectedValue}</h2> */}
                {video?(<YouTube videoId={video.key} opts={opts} />):
                <div className="errorMessage">Error displaying video. Please try again.</div>
                }

            </Dialog>


        </div>
    );
}

SimpleMemberDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const handleClickOpen = (value) => {
        setSelectedValue(value);
        setOpen(true);

    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue('');
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <div className="container">
                                <img className="row__play" src={playIcon} alt="play" onClick={() => handleClickOpen(movie.id)}></img>
                                <img onClick={() => handleClickOpen(movie.id)}
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                        }`}
                                    alt={movie.name}
                                />
                            </div>

                        )
                )}
            </div>
            {selectedValue?(<SimpleMemberDialog selectedValue={selectedValue} open={open} onClose={handleClose} />):null}

        </div>
    );
}

export default Row
