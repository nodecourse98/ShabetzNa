// Enter your git repo url
def gitUrl = "https://github.com/nodecourse98/ShabetzNa-Server"
// Enter the name of your project
def project = "ShabetzNa-Server"
// Enter a name for your job. Should look like = unit-testing-projectname
def job = "unit-testing-ShabetzNa-Server"

job(job) {
    scm {
        git(gitUrl)
    }
    triggers {
        scm('*/5 * * * *')
    }
    steps {
        shell('npm install')
        shell('npm test')
    }
}

listView(project) {
    filterBuildQueue()
    filterExecutors()
    jobs {
        name(job)
        // regex(/'unit-testing-$project'/)
    }
    jobFilters {
        status {
            status(Status.UNSTABLE)
        }
    }
    columns {
        status()
        weather()
        name()
        lastSuccess()
        lastFailure()
        lastDuration()
        buildButton()
    }
}
