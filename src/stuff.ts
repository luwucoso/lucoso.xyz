function createTitleCard(imageUrl, title, color, project) {
    const button = document.createElement('button');
    button.className = `title-card ${color}`;
    button.style.backgroundImage = `url(${imageUrl})`;
    button.style.backgroundSize = 'cover';
    button.style.backgroundPosition = 'center';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';  

    button.addEventListener('click',  () => {
        window.location.href = `/projects/${project}`;
    });

    const h2 = document.createElement('h2');
    h2.textContent = title;
    button.appendChild(h2);

    return button;
}

function get_projects() {
    fetch('/projects_list')
        .then(response => response.text())
        .then(data => {
            // Process the retrieved data here
            const projects = data.split('\n'); // Split the data into an array of links
            console.log(projects)
            let parent = document.getElementById("projects")

            projects.forEach((project) => {
                fetch(`/projects/${project}/description.json`)
                    .then(response => response.json())
                    .then(data => {
                        // Use the data to create the title card
                        const titleCard = createTitleCard(
                            `/projects/${project}/cover.jpg`,
                            data.title,
                            data.color,
                            project
                        );
                        parent.appendChild(titleCard);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error, 'from project:', project);
                        parent.appendChild(createTitleCard('/error.jpg', "ERROR!!", "red", NaN))
                    });
            });
            

        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
}

get_projects()