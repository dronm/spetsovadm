Component schema description:

- Grid.vue
  Common html grid. Possible edit modes (editMode property): inline, modal, view.
  When GridEditMode.view is used, it is possible to import a custom form. If no
  custom form is provided (FormView.vue), a default form is used, which itcludes all grid columns
  as form controls.
  Uses the following components:
  GridEditForm.vue for inline editing with no alternative in inline mode.
  Modal.vue with custom editForm (property) or default Form.vue in modal mode.
  Custom form from editForm (property) or Form.vue for edit mode equals to form.
  This component should not be used directly. Use it as a child component for predefined
  grids like GridLocal.vue, GridSrv.vue.
  Grid.vue is connected to forms (GridEditForm, Form.vue or custom form).
  It also is connected to parent components like GridLocal.vue or GridSrv.vue where validation
  and actual submition happens.

- GridSrv.vue
  Grid connected to server api.
  Validation and cancel confirmations are treated here.
  editRow schema:
  GridSrv has a const editRow = ref(undefined)
  it passes it to Grid editRow (property)
  Grid passes editRow(prop) to Form data (prop)
  Form passes it to Edit as data[fieldID] with v-model

- GridLocal.vue

- GridEditForm.vue
  GridEditForm.vue is used for Grid inline editing. It emits events: submit, cancel. There is no save event,
  as there is no use in "Save" button in grid inline form. With submit event new (modified) data is sent.
  This component has no validation, or cancalation confirmations. It just emits events with modified data.

- Form.vue
  Form edit data. No difference from GridEditForm.vue, but GridEditForm.vue`s template is for grid markup.
  It also adds "save" event, as it is possible to have a save button for saving modified data and stay
  at the save form.
  If it is possible to solve the problem of markup and add save to inline edit mode, it is a good idea to
  merge these two components.

- FormView.vue
  Standalone view, which internally has a Form.vue as a child. It adds standalone form functionallity:
  close form when done. It also handles validation and conselation cases as it is a wrapper for Form
  component.
