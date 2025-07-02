const { PrismaClient } = require('../generated/prisma');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
    // // Clean existing data
    // await prisma.comment.deleteMany();
    // await prisma.post.deleteMany();
    // await prisma.user.deleteMany();

    // // Create 5 users
    // const users = [];
    // for (let i = 0; i < 5; i++) {
    //     const user = await prisma.user.create({
    //         data: {
    //             email: faker.internet.email(),
    //             name: faker.person.fullName(),
    //             role: i === 0 ? 'ADMIN' : i === 1 ? 'EDITOR' : 'USER',
    //         },
    //     });
    //     users.push(user);
    //     console.log(`Created user: ${user.name}`);
    // }

    // // Each user creates 2-4 posts
    // for (const user of users) {
    //     const postCount = faker.number.int({ min: 2, max: 4 });
    //     for (let i = 0; i < postCount; i++) {
    //         const post = await prisma.post.create({
    //             data: {
    //                 title: faker.lorem.sentence(),
    //                 content: faker.lorem.paragraphs(3),
    //                 published: faker.datatype.boolean(),
    //                 authorId: user.id,
    //             },
    //         });
    //         console.log(`Created post: ${post.title}`);

    //         // Add 1-3 comments to each post from random users
    //         const commentCount = faker.number.int({ min: 1, max: 3 });
    //         for (let j = 0; j < commentCount; j++) {
    //             const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
    //             await prisma.comment.create({
    //                 data: {
    //                     text: faker.lorem.sentence(),
    //                     postId: post.id,
    //                     authorId: randomUser.id,
    //                 },
    //             });
    //             console.log(`Added comment to post ${post.id}`);
    //         }
    //     }
    // }

    // ====================================== Homework Starts Here ======================================

    await prisma.class.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();

    // for (const student of students) {

    // }

    // const students = [];
    // for (let i = 0; i < 6; i++) {
    //     const yearNum = faker.number.int({ min: 1, max: 4 });

    //     const student = await prisma.student.create({
    //         data: {
    //             name: faker.person.fullName(),
    //             year: yearNum === 1 ? 'FirstGrade' : yearNum === 2 ? 'SecondGrade' : yearNum === 3 ? 'ThirdGrade' : 'FourthGrade',
    //             teacher: {
    //                 connect: {
    //                     id: faker.number.int({ min: 1, max: 6 })
    //                 }
    //             },
    //             class: {
    //                 connect: {
    //                     id: faker.number.int({ min: 1, max: 6 })
    //                 }
    //             },
    //         },
    //     });
    //     students.push(student);
    //     console.log(`Created student: ${student.name}`);
    // }

    const classes = [];
    for (let i = 0; i < 6; i++) {
        const classObj = await prisma.class.create({
            data: {
                teacher: {
                    create: {
                        name: faker.person.fullName(),
                    }
                }
            },
            include: {
                teacher: true,
            }
        })
        classes.push(classObj);
    }
    

    // const teachers = [];
    // for (const classObj of classes) {
    //     const teacher = await prisma.teacher.create({
    //         data: {
    //             name: faker.person.fullName(),
    //             class: {
    //                 connect: {
    //                     id: classObj.id
    //                 }
    //             }
    //         },
    //     });
    //     teachers.push(teacher);
    //     console.log(`Created teacher: ${teacher.name} with ID ${teacher.id}`);
    // }

    const students = [];
    for (const classObj of classes) {
        for (let i = 0; i < 6; i++) {
            const yearNum = faker.number.int({ min: 1, max: 4 });

            const student = await prisma.student.create({
                data: {
                    name: faker.person.fullName(),
                    year: yearNum === 1 ? 'FirstGrade' : yearNum === 2 ? 'SecondGrade' : yearNum === 3 ? 'ThirdGrade' : 'FourthGrade',
                    teacher: {
                        connect: {
                            id: classObj.teacher.id,
                        }
                    },
                }
            })
            students.push(student);
        }
    }

    // const teachers = [];
    // for (let i = 0; i < 6; i++) {
    //     const teacher = await prisma.teacher.create({
    //         data: {
    //             name: faker.person.fullName(),
    //             students: {
    //                 connect: {
    //                     id: faker.number.int({ min: 1, max: 6 }),
    //                     id: faker.number.int({ min: 1, max: 6 })
    //                 }
    //             },
    //             class: {
    //                 connect: {

    //                 }
    //             }
    //         }
    //     })
    //     teachers.push(teacher);
    //     console.log(`Created student: ${teacher.name}`);
    // }

    // const courses = []; 
    // for (let i = 0; i < 6; i++) {
    //     const teacherCourseNum = faker.number.int({min: 1, max: 6})
    //     const course = await prisma.studentCourse.create({
    //         data: {
    //             title: teacherCourseNum === 1 ? 'Literature' : teacherCourseNum === 2 ? 'Algebra' : teacherCourseNum === 3 ? 'Geometry' :  
    //             teacherCourseNum === 4 ? 'Chemistry' : teacherCourseNum === 5 ? 'Biology' : 'History',
    //         },
    //     })
    // }

}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });