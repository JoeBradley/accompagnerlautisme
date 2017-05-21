import Toy from '../models/toy';
import ToyCategory from '../models/toyCategory';
import ToyTag from '../models/toyTag';
import User from '../models/user';
import { uploadImage } from '../../../image/cloudinaryUploader';

/**
 * GET /toys
 */
export function allToys(req, res) {
  Toy.find({}).sort({name: 1}).populate('categories tags').exec(function (err, toys) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des jouets' });
    }
    return res.status(200).json( { toys: toys} );
  });
}

/**
 * GET /toys/categories
 */
export function allCategories(req, res) {
  ToyCategory.find({}).sort({name: 1}).populate('suggestedTags').exec(function (err, toyCategories) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des catégories de jouets' });
    }
    return res.status(200).json( { categories: toyCategories} );
  });
}

/**
 * GET /toys/tags
 */
export function allTags(req, res) {
  ToyTag.find({}).sort({name: 1}).exec(function (err, toyTags) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des mots clés' });
    }
    return res.status(200).json( { tags: toyTags} );
  });
}

/**
 * POST /toys/category creates or updates a category with provided data
 */
export function saveCategory(req, res) {
  if (req.body.toyCatId !== '') {
    
    if (req.body.toyCatId == 0) {
      var newCat = new ToyCategory();
      newCat.name = req.body.name;
      newCat.suggestedTags = req.body.suggestedTags;

      newCat.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        return res.status(200).json({ category: newCat, message:  'Catégorie créée avec succès' });
      });
    } else {
      const query = {
        _id: req.body.toyCatId
      };

      ToyCategory.findOne(query, (err, existingCat) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche du mot clé' });
        }

        existingCat.name = req.body.name;
        existingCat.suggestedTags = req.body.suggestedTags;
        existingCat.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ category: existingCat, message: 'Catégorie mise à jour avec succès' });
        });
        
      });
    }
  
  }
}

/**
 * POST /toys/tag creates or updates a tag with provided data
 */
export function saveTag(req, res) {
  if (req.body.toyTagId !== '') {
    
    if (req.body.toyTagId == 0) {
      var newTag = new ToyTag();
      newTag.name = req.body.name;

      newTag.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        return res.status(200).json({ tag: newTag, message:  'Mot clé créé avec succès' });
      });
    } else {
      const query = {
        _id: req.body.toyTagId
      };

      ToyTag.findOne(query, (err, existingTag) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche du mot clé' });
        }

        existingTag.name = req.body.name;
        existingTag.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ tag: existingTag, message: 'Mot clé mis à jour avec succès' });
        });
        
      });
    }
  }
}

/**
 * remove a category
 */
export function removeCategory(req, res) {
  const catId = req.params.id;
  const query = { _id: catId };
  
  ToyCategory.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    Toy.update(
      { },
      { $pull: { categories: catId } }
    );

    return res.status(200).send({ id: catId, message: 'Catégorie supprimée avec succès' });
  });
}

/**
 * remove a tag
 */
export function removeTag(req, res) {
  const tagId = req.params.id;
  const query = { _id: tagId };
  
  ToyTag.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    ToyCategory.update(
      { },
      { $pull: { suggestedTags: tagId } }
    );
    return res.status(200).send({ id: tagId, message: 'Mot clé supprimé avec succès' });
  });
}

function addPicture(pictures, file, folder) {
  if (file) {
      var picture = {
        path: file[0].path,
        folder: folder
      };
    pictures.push(picture);
  }
}

/**
 * POST /toys creates or updates a toy with provided data
 */
export function saveToy(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    // file in request :
/*          { fieldname: 'pictures[0]',
  originalname: 'IMG_5649.JPG',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'be7f7d60a3ed0170630c482f98b32d64',
  path: 'uploads/be7f7d60a3ed0170630c482f98b32d64',
  size: 2447372 }*/
  
  // result after upload :
  
/*  { public_id: 'bhtoqh2wfljr9dkzkn6e',
  version: 1495318268,
  signature: '66759e1d169802c9feef939c39b3955ff97ccc88',
  width: 2448,
  height: 3264,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2017-05-20T22:11:08Z',
  tags: [],
  bytes: 2909854,
  type: 'upload',
  etag: '35cef7fc74b08fd906c789f3e39bf93c',
  url: 'http://res.cloudinary.com/dzona3plq/image/upload/v1495318268/bhtoqh2wfljr9dkzkn6e.jpg',
  secure_url: 'https://res.cloudinary.com/dzona3plq/image/upload/v1495318268/bhtoqh2wfljr9dkzkn6e.jpg',
  original_filename: 'f39ff7d897e38a707605d49ace1be4e5' }*/

    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de votre compte' });
      }

      if (req.body.toyId !== '') {
        
        if (req.body.toyId == 0) {
          
          var pictures = [];
          addPicture(pictures, req.files['pictures[0]'], user._id);
          addPicture(pictures, req.files['pictures[1]'], user._id);
          addPicture(pictures, req.files['pictures[2]'], user._id);
          addPicture(pictures, req.files['pictures[3]'], user._id);

          var results = [];
          var callback = function(err, res) {
            if (!err) {
              results.push(res);
              console.log(results);
            }
          };

          // By default, Cloudinary's upload API works synchronously: 
          // uploaded images are processed and eager transformations 
          // are generated synchronously during the upload API call,
          
          pictures.forEach((p) => {
            uploadImage(p, callback);
          });

          var newToy = new Toy();
          newToy.name = req.body.name;
          if (req.body.content) {
            newToy.content = req.body.content;
          }
          if (req.body.description) {
            newToy.description = req.body.description;
          }
          
          newToy.categories = req.body.categories;
          newToy.tags = req.body.tags;
          newToy.owner = user._id;
          
          var urls = [];
          results.forEach((r) => {
            urls.push(r.secure_url);
          });
          console.log(urls);
          newToy.pictures = results;
          
          newToy.save(function(err) {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la création' });
            }
            
            user.toys.push(newToy._id);
            user.save(function(err) {
              if (err) {
                return res.status(500).json({ message: 'Problème technique lors de l\'ajout du jouet à votre compte' });
              }
              return res.status(200).json({ toy: newToy, message:  'Jouet créé avec succès' });
            });
          });

        } else {
          const query = {
            _id: req.body.toyId
          };
    
          Toy.findOne(query, (err, existingToy) => {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la recherche du jouet' });
            }
    
            existingToy.name = req.body.name;
            existingToy.content = req.body.content;
            existingToy.description = req.body.description;
            existingToy.categories = req.body.categories;
            existingToy.tags = req.body.tags;
            
            existingToy.save(function(err) {
              if (err) {
                return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
              }
              return res.status(200).json({ toy: existingToy, message: 'Jouet mis à jour avec succès' });
            });
            
          });
        }
      }
    });
  }
}




/**
 * remove a toy
 */
export function removeToy(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'utilisateur' });
      }

      const toyId = req.params.id;
      const query = { _id: toyId, owner: user._id };
      
      Toy.findOneAndRemove(query, (err) => {
        if (err) {
          return res.status(500).send('Problème technique lors de la suppression');
        }
        
        user.toys.pull(toyId);
        user.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la suppression du jouet de votre compte' });
          }
          return res.status(200).send({ id: toyId, message: 'Jouet supprimé avec succès' });
        });
      });
    });
  }
}

export default {
  allToys,
  saveToy,
  removeToy,
  allCategories,
  saveCategory,
  removeCategory,
  allTags,
  saveTag,
  removeTag
};
