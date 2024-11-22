import SecurityProps from './parts/SecurityProps';
import UserProps from '../user/parts/UserProps';
import SequenceFlowProps from '../sequenceFlow/parts/SequenceFlowProps';
import ModelProps from '../model/parts/ModelProps';
import CollaborationProps from '../model/parts/CollaborationProps';
import LaneProps from '../model/parts/LaneProps';
import ParticipantProps from '../model/parts/ParticipantProps';
import ParticipantWithoutLaneProps from '../model/parts/ParticipantWithoutLaneProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function SecurityPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  this.getGroups = function(element) {
    return function(groups) {
      if (is(element, 'bpmn:ServiceTask') && element.businessObject.securityType === 'SoD') {
        return groups;
      } else if (is(element, 'bpmn:ServiceTask') && element.businessObject.securityType === 'BoD') {
        return groups;
      } else if (is(element, 'bpmn:ServiceTask') && element.businessObject.securityType === 'UoC') {
        groups.push(createUoCGroup(element, translate));
      } else if (is(element, 'bpmn:ManualTask') || is(element, 'bpmn:UserTask') || (is(element, 'bpmn:Task') 
        || is(element, 'bpmn:BusinessRuleTask') || is(element, 'bpmn:ScriptTask') || is(element, 'bpmn:CallActivity') 
        || is(element, 'bpmn:SendTask') || is(element, 'bpmn:ReceiveTask')
        && !is(element, 'bpmn:ServiceTask'))) {
        groups.push(createUserGroup(element, translate));
      } else if (is(element, 'bpmn:SequenceFlow')) {
        const lengthSubTask = element.businessObject.sourceRef.outgoing.length;
        const sourceElement = element.businessObject.sourceRef;
        if (sourceElement && is(sourceElement, 'bpmn:Gateway') && lengthSubTask > 1) {
          groups.push(createSequenceFlowGroup(element, translate));
        }
      } else if (is(element, 'bpmn:Process')) {
        groups.push(createModelGroup(element, translate));
      } else if ( is(element, 'bpmn:Collaboration')) {
        groups.push(createCollaborationGroup(element, translate));
      } else if ( is(element, 'bpmn:Lane')) {
        groups.push(createLaneGroup(element, translate));
      } else if (is(element, 'bpmn:Participant')) {
        const processRef = element.businessObject.processRef;
        const laneSets = processRef && processRef.laneSets;
        const lanes = laneSets && laneSets[0] && laneSets[0].lanes;
    
        if (!lanes || lanes.length === 0) {
            groups.push(createParticipantWithoutLaneGroup(element, translate));
        } else {
            groups.push(createParticipantGroup(element, translate));
        }
    }    
      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

SecurityPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createUoCGroup(element, translate) {
  const securityGroup = {
    id: 'security-uoc',
    label: translate('UoC properties'),
    entries: SecurityProps(element),
    tooltip: translate('Ensure proper UoC management!')
  };

  return securityGroup;
}

function createUserGroup(element, translate) {
  const userGroup = {
    id: 'User',
    label: translate('UserTask properties'),
    entries: UserProps(element),
    tooltip: translate('Make sure you know what you are doing!')
  };

  return userGroup;
}

function createSequenceFlowGroup(element, translate) {
  const sequenceFlowGroup = {
    id: 'sequenceFlow',
    label: translate('SequenceFlow properties'),
    entries: SequenceFlowProps(element),
    tooltip: translate('Make sure you know what you are doing!')
  };

  return sequenceFlowGroup;
}

function createModelGroup(element, translate) {
  const modelGroup = {
    id: 'model',
    label: translate('Model properties'),
    entries: ModelProps(element),
    tooltip: translate('Manage model-level properties')
  };

  return modelGroup;
}

function createCollaborationGroup(element, translate) {
  const collaborationGroup = {
    id: 'model',
    label: translate('Model properties'),
    entries: CollaborationProps(element),
    tooltip: translate('Manage model-level properties')
  };

  return collaborationGroup;
}

function createLaneGroup(element, translate) {
  const laneGroup = {
    id: 'model',
    label: translate('Model properties'),
    entries: LaneProps(element),
    tooltip: translate('Manage model-level properties')
  };

  return laneGroup;
}

function createParticipantGroup(element, translate) {
  const laneGroup = {
    id: 'model',
    label: translate('Model properties'),
    entries: ParticipantProps(element),
    tooltip: translate('Manage model-level properties')
  };

  return laneGroup;
}

function createParticipantWithoutLaneGroup(element, translate) {
  const laneGroup = {
    id: 'model',
    label: translate('Model properties'),
    entries: ParticipantWithoutLaneProps(element),
    tooltip: translate('Manage model-level properties')
  };

  return laneGroup;
}
