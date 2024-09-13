import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  public type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  public type Category = {
    name: Text;
    description: Text;
  };

  let categories : [Category] = [
    { name = "Red Team"; description = "Offensive security techniques and strategies" },
    { name = "Pen Testing"; description = "Penetration testing methodologies and tools" },
    { name = "Blue Team"; description = "Defensive security and incident response" },
    { name = "Cryptography"; description = "Encryption, decryption, and secure communication" },
    { name = "Social Engineering"; description = "Human-focused security exploitation" },
    { name = "Malware Analysis"; description = "Studying and reverse engineering malicious software" },
    { name = "Web Security"; description = "Vulnerabilities and security in web applications" },
    { name = "Network Security"; description = "Protecting and securing computer networks" }
  ];

  stable var postEntries : [(Text, List.List<Post>)] = [];
  var posts = HashMap.fromIter<Text, List.List<Post>>(postEntries.vals(), 10, Text.equal, Text.hash);

  public func addPost(category: Text, title: Text, body: Text, author: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    let categoryPosts = switch (posts.get(category)) {
      case (null) { List.nil<Post>() };
      case (?existingPosts) { existingPosts };
    };
    posts.put(category, List.push(newPost, categoryPosts));
  };

  public query func getPosts(category: Text) : async [Post] {
    switch (posts.get(category)) {
      case (null) { [] };
      case (?categoryPosts) { List.toArray(categoryPosts) };
    };
  };

  public query func getCategories() : async [Category] {
    categories
  };

  system func preupgrade() {
    postEntries := Iter.toArray(posts.entries());
  };

  system func postupgrade() {
    posts := HashMap.fromIter<Text, List.List<Post>>(postEntries.vals(), 10, Text.equal, Text.hash);
  };
}