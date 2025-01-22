import React from 'react';
import Button from 'react-bootstrap/esm/Button';

function Patient({ data }) {
    return (
        <div style={{ padding: '20px', margin: '8px', backgroundColor: '#202020', borderRadius: '5px' }}>
            <div>
                <div dangerouslySetInnerHTML={{ __html: data['resource']['text']['div'] }} />
            </div>
            <Button href={data['fullUrl']} target="_blank" rel="noopener noreferrer">View More Info</Button>
        </div>
    );
}

export default Patient;
