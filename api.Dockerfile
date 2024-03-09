FROM python:3.10

RUN mkdir /app

WORKDIR /app/
COPY ./environment.yml ./

ENV PATH="/opt/miniconda3/envs/conda_env/bin:/opt/miniconda3/bin:$PATH"

# Install Conda
RUN curl -L https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -o miniconda.sh && \
    /bin/bash miniconda.sh -b -p "/opt/miniconda3" && \
    rm miniconda.sh && \
    \
    # Setup channels, only use channels in environment file or built locally. \
    conda config --remove channels defaults && \
    conda config --add channels conda-forge && \
    \
    # Create the environment
    conda env create --force --file ./environment.yml -n conda_env &&\
    conda clean --yes --all && \
    rm -rf ./conda

COPY . .

RUN pip install -e . && python manage.py collectstatic --no-input

CMD ["echo", "This image has no default run command."]
