import React from 'react';
import fetcher from '../../fetcher';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
    render = () => (
            <section id="slider">
                <img className="button" src="/left.png" title="previous" alt="nav" />
                <div className="image-container">
                    <img src= alt="episode" />
                </div>
                <img className="button" src="/right.png" title="previous" alt="nav" />
            </section>
        );
}