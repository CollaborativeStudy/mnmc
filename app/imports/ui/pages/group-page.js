import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Groups} from '../../api/groups/groups.js';

Template.Group_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  groupsList() {
    return Groups.find();
  },
});

Template.Group_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Groups');
  });
});

Template.Group_Page.events({
  // 'click .edit-pro'(event, instance){
  //   console.log('edit pro');
  // },
  'click .create-session'(event, instance) {
    $('.ui.modal.sessions-modal')
        .modal('show')
    ;
  },
  'click .create-group'(event, instance) {
    console.log("Entered click group")
    $('.ui.modal.groups-modal')
        .modal('show')
    ;
  },
});
