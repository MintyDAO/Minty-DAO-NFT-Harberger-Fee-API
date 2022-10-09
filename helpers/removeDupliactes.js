// Remove duplicate obj in array
// Remove old duplicate
module.exports = (arr, comp) => {
  const reverse = arr.reverse()

  const unique = reverse
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => reverse[e]).map(e => reverse[e]);

   return unique;
}
