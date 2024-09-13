export const idlFactory = ({ IDL }) => {
  const Category = IDL.Record({ 'name' : IDL.Text, 'description' : IDL.Text });
  const Post = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getPosts' : IDL.Func([IDL.Text], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
