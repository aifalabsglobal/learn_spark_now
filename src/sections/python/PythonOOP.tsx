import CodeBlock from '../../components/CodeBlock';

export default function PythonOOP() {
  return (
    <section id="python-oop" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Classes &amp; OOP</h2>

      <div id="python-classes" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Defining a Class
        </h3>
        <CodeBlock
          title="class, __init__, self"
          code={`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person("Alice", 30)
p.greet()  # "Hi, I'm Alice"`}
        />
      </div>

      <div id="python-inheritance" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Inheritance
        </h3>
        <CodeBlock
          title="Subclass"
          code={`class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id

    def greet(self):
        return f"Student {self.student_id}: {super().greet()}"`}
        />
      </div>
    </section>
  );
}
