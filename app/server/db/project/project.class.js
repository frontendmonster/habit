export class ProjectClass {
  static get(id, fields) {
    return this.findById(id, fields)
      .exec()
      .then((project) => {
        if (project) {
          return project;
        }

        const err = new Error('Project not found!');
        return Promise.reject(err);
      });
  }

  static list({ skip = 0, limit = 100 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }

  static remove(id) {
    return this.get(id)
      .then(project => project.remove())
      .catch(e => Promise.reject(e));
  }

  static async getTasks(id) {
    const project = await this.findById(id, { tasks: 1, _id: 0 })
      .populate('tasks')
      .exec();
    return project.tasks;
  }
}