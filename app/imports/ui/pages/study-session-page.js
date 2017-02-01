import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { Users } from '../../api/users/users.js';

Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
});

Template.Study_Session_Page.helpers({
  sessionsList() {
    return Sessions.find();
  },
  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");
    let searchResult = Sessions.find();

    // Search the Sessions collection for any sessions with the same course as searchValue and return it.
    if (searchValue) {
      return Sessions.find({ course: searchValue.toUpperCase() });
    }
    else {
      return Sessions.find();
    }
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Study_Session_Page.events({
  'submit #search': function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());
  },
  'click .reset'(event){
    event.preventDefault();
    Session.set("searchValue", null);
    FlowRouter.reload();
  }
});
