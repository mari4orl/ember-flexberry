import Ember from 'ember';
import { executeTest } from './execute-flexberry-lookup-test';

executeTest('flexberry-lookup hierarchy olv test', (store, assert, app) => {
  assert.expect(16);
  let path = 'components-examples/flexberry-lookup/hierarchy-olv-in-lookup-example';
  visit(path);
  andThen(() => {
    assert.equal(currentPath(), path);

    function elementCheck(name) {
      let $elem = Ember.$(name);
      if ($elem.length === 0) { return false; }else { return true;}
    }

    let $lookupChooseButtons = Ember.$('.ui-change');
    $lookupChooseButtons[0].click();

    //First lookup
    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        assert.equal(elementCheck('button.hierarchical-button'), true, 'has hierarchical-button');
        assert.equal(elementCheck('button.hierarchy-expand'), true, 'has hierarchy-expand');
        assert.equal(elementCheck('div.nav-bar'), false, 'no nav-bar');

        let $menuTable = Ember.$('.content table.object-list-view');
        let $menuTableBody = $menuTable.children('tbody');
        let $menuTableRowCount = $menuTableBody.children('tr').length;

        let $expandButton = Ember.$('button.hierarchy-expand');
        $expandButton[0].click();

        assert.equal($menuTableRowCount < $menuTableBody.children('tr').length, true, 'hierarchy expanded '+ $menuTableRowCount + " " + $menuTableBody.children('tr').length);

        let $nextTableRow = $expandButton.parents('tr').next('tr');
        let $nextTableRowTd = $nextTableRow.children('td').next();

        assert.equal($nextTableRowTd.css('padding-left'), '20px', 'expanded text has padding-left: 20px');

        let $closeButton = Ember.$('i.close.icon');
        $closeButton.click();

        done();
      }, 5000);
    });

    //Second lookup
    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        $lookupChooseButtons[1].click();

        done();
      }, 5500);
    });

    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        assert.equal(elementCheck('button.hierarchical-button'), true, 'has hierarchical-button');
        assert.equal(elementCheck('button.hierarchy-expand'), false, 'no hierarchy-expand');
        assert.equal(elementCheck('div.nav-bar'), true, 'has nav-bar');

        let $hierarchicalButton = Ember.$('button.hierarchical-button');
        $hierarchicalButton.click();

        done();
      }, 6500);
    });

    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        assert.equal(elementCheck('button.hierarchy-expand'), true, 'has hierarchy-expand');
        assert.equal(elementCheck('div.nav-bar'), false, 'no nav-bar');

        let $menuTable = Ember.$('.content table.object-list-view');
        let $menuTableBody = $menuTable.children('tbody');
        let $menuTableRowCount = $menuTableBody.children('tr').length;

        let $expandButton = Ember.$('button.hierarchy-expand');
        $expandButton[0].click();

        assert.equal($menuTableRowCount < $menuTableBody.children('tr').length, true, 'hierarchy expanded '+ $menuTableRowCount + " " + $menuTableBody.children('tr').length);

        let $nextTableRow = $expandButton.parents('tr').next('tr');
        let $nextTableRowTd = $nextTableRow.children('td').next();

        assert.equal($nextTableRowTd.css('padding-left'), '20px', 'expanded text has padding-left: 20px');

        let $closeButton = Ember.$('i.close.icon');
        $closeButton.click();
        
        done();
      }, 10500);
    });

    //Third lookup
    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        $lookupChooseButtons[2].click();

        done();
      }, 11000);
    });

    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {
        assert.equal(elementCheck('button.hierarchical-button'), false, 'no hierarchical-button');
        assert.equal(elementCheck('button.hierarchy-expand'), false, 'no hierarchy-expand');
        assert.equal(elementCheck('div.nav-bar'), true, 'has nav-bar');

        let $closeButton = Ember.$('i.close.icon');
        $closeButton.click();

        done();
      }, 12000);
    });

    Ember.run(() => {
      var done = assert.async();
      setTimeout(function() {

        done();
      }, 13000);
    }); 
  });
});