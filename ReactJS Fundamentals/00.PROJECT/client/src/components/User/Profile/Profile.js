import React, { Component } from 'react';
import '../../../styles/profile.css';

class Profile extends Component {
    render() {
        return (
            <div id='container'>
                <div id='profile'>
                    <div id='main-info'>
                        <img id='profile-pic' src='https://www.myherodesign.com/wp-content/uploads/2016/06/Indian_Man_Suspicious.gif' />
                        <h2>John Doe</h2>
                        <h2 class='opacity'>(#john_doe_1990)</h2>
                    </div>
                    <div id='other-info'>
                        <div class='info-cell'>
                            <span class='info-label'> Country:</span> <span class='profile-data'> Bulgaria <span class='flag-icon flag-icon-bg'></span></span>
                        </div>
                        <div class='info-cell'>
                            <span class='info-label'> City:</span> <span class='prfile-data'>N/A</span>
                        </div>
                        <div class='info-cell'>
                            <span class='info-label'> Birth Date:</span> <span class='profile-data'>22/06/1990</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
