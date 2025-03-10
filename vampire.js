class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get ancestors() {
    let ancestors = [];
    let currentVampire = this;
    for (let i = currentVampire.numberOfVampiresFromOriginal; i >= 0; i--) {
      ancestors.push(currentVampire)
      currentVampire = currentVampire.creator;
    }
    return ancestors;
  }
  
  closestCommonAncestor(vampire) {
    const ancestorsOfThis = this.ancestors;
    const ancestorsOfVampire = vampire.ancestors;
    if (ancestorsOfThis.length <= ancestorsOfVampire.length) {
      for (let i = 0; i < ancestorsOfThis.length;) {
        if (ancestorsOfVampire.includes(ancestorsOfThis[i])) {
          return ancestorsOfThis[i];
        }
        i++
      }
    } else {
      for (let i = 0; i < ancestorsOfVampire.length;) {
        if (ancestorsOfThis.includes(ancestorsOfVampire[i])) {
          return ancestorsOfVampire[i];
        }
        i++;
      }
    }
  }
}

module.exports = Vampire;

