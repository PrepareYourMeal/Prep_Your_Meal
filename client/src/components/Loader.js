import React, { Component } from 'react';

class PreLoaderWidget extends Component {

    render() {
        return (
            // <div className="preloader">
            //     <div className="status">
            //         <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>
            //     </div>
            // </div>
<div id="preloader" style="display: none;">
<div id="status" style="display: none;">
    <div class="spinner">Loading...</div>
</div>
</div>

        )
    }
}

export default PreLoaderWidget;