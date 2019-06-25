// surveyformreview shows users their form inputs for review 
import _ from 'lodash';
import React from 'react'; 
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; //withrouter  le history pass garxa.  
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { //history vanne object add garyo
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please confirm your entries</h5> 
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
            <button 
                onClick={()=>submitSurvey(formValues, history)}
                className="green  btn-flat right"
            >
                Send Survey
                <i className="material-icons right white-text">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview)); // withRouter as an normal fuction that takes component 
                                                                                // as an argument