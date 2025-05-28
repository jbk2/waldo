import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = ["addCharacter", "charactersFields", "characterFields", "characterFieldsTemplate"]

  connect() {
    console.log('New Image controller connected')
    console.log('add character target found', this.addCharacterTarget)
    console.log('characters fields target found', this.charactersFieldsTarget)
    console.log('characters fields template target found', this.charactersFieldsTemplateTarget)
  }

  addCharacter() {
    const charactersFields = this.charactersFieldsTarget
    const characterFields = this.characterFieldsTargets
    const characterFieldsTemplate = this.characterFieldsTemplateTarget

    const indexes = characterFields
      .map(character => parseInt(character.dataset.characterIndex))
        .filter(Number.isFinite)

    const newID = indexes.length > 0 ? Math.max(...indexes) + 1 : 0;
    const html = characterFieldsTemplate.innerHTML.replace(/NEW_RECORD/g, newID);

    charactersFields.insertAdjacentHTML("beforeend", html);
  }
  
  removeCharacter(event) {
    const fieldset = event.target.closest('.character-fields');
    if (fieldset) fieldset.remove();
  }

}
